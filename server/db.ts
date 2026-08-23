import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, learningProgress, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getLearningProgressForUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(learningProgress).where(eq(learningProgress.userId, userId));
}

export async function saveLearningProgress(input: { userId: number; gameId: string; attempts: number; completions: number; bestScore: number; lastScore: number; lastPlayedAt?: Date | null }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const existing = await db.select().from(learningProgress).where(and(eq(learningProgress.userId, input.userId), eq(learningProgress.gameId, input.gameId))).limit(1);
  if (existing[0]) {
    await db.update(learningProgress).set({ attempts: input.attempts, completions: input.completions, bestScore: input.bestScore, lastScore: input.lastScore, lastPlayedAt: input.lastPlayedAt ?? new Date() }).where(eq(learningProgress.id, existing[0].id));
    return { ...existing[0], ...input };
  }
  const [created] = await db.insert(learningProgress).values({ ...input, lastPlayedAt: input.lastPlayedAt ?? new Date() });
  return { ...input, id: Number(created.insertId), lastPlayedAt: input.lastPlayedAt ?? new Date() };
}

export function mergeProgressValues(current: { attempts: number; completions: number; bestScore: number; lastScore: number } | undefined, incoming: { attempts: number; completions: number; bestScore: number; lastScore: number }) {
  return {
    attempts: Math.max(current?.attempts ?? 0, incoming.attempts),
    completions: Math.max(current?.completions ?? 0, incoming.completions),
    bestScore: Math.max(current?.bestScore ?? 0, incoming.bestScore),
    lastScore: Math.max(current?.lastScore ?? 0, incoming.lastScore),
  };
}

export async function mergeGuestProgressForUser(userId: number, input: { gameId: string; attempts: number; completions: number; bestScore: number; lastScore: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const existing = await db.select().from(learningProgress).where(and(eq(learningProgress.userId, userId), eq(learningProgress.gameId, input.gameId))).limit(1);
  const current = existing[0];
  return saveLearningProgress({ userId, gameId: input.gameId, ...mergeProgressValues(current, input), lastPlayedAt: new Date() });
}

export async function deleteLearningProgressForUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.delete(learningProgress).where(eq(learningProgress.userId, userId));
}
