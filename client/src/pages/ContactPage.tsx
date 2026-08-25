import { useState } from "react";
import { ArrowUpRight, Check, Mail, Send } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const SUPPORT_EMAIL = "auth@aiforstudents.in";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => setSent(true),
  });

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    submitContact.mutate({
      subject: String(form.get("subject") || "AI for Students enquiry"),
      message: String(form.get("message") || ""),
      name: String(form.get("name") || ""),
      replyEmail: String(form.get("email") || ""),
    });
  };

  return (
    <div className="contact-page">
      <header className="contact-header">
        <Link href="/" className="brand" aria-label="AI for Students home">
          <span className="brand-mark contact-mark">AI</span>
          <span className="brand-type"><strong>AI</strong> for <em>Students</em></span>
        </Link>
        <Link href="/" className="text-link">Back to home <ArrowUpRight size={15} /></Link>
      </header>
      <main className="contact-main">
        <div className="contact-intro">
          <div className="section-label"><span className="section-label__bar" /><span>CONTACT THE DESK</span></div>
          <h1>Have a question?<br /><em>Write to us.</em></h1>
          <p>For account access, platform questions, feedback or partnership enquiries, send a note to the AI for Students team.</p>
          <a className="contact-email" href={`mailto:${SUPPORT_EMAIL}`}><Mail size={17} /> {SUPPORT_EMAIL}</a>
          <p className="contact-note">We currently provide email support only. Please do not include passwords, authentication codes or sensitive personal information.</p>
          <p className="contact-response">Response times vary; we will reply by email when available.</p>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" required autoComplete="name" />
          <label htmlFor="contact-email">Reply email</label>
          <input id="contact-email" name="email" type="email" required autoComplete="email" />
          <label htmlFor="contact-subject">Subject</label>
          <input id="contact-subject" name="subject" required />
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" required rows={6} />
          <button type="submit" className="button button--primary" disabled={submitContact.isPending}><Send size={15} /> {submitContact.isPending ? "Sending…" : "Send message"} <ArrowUpRight size={15} /></button>
          {sent && <p className="contact-success" role="status"><Check size={16} /> Your message was sent. We will reply by email.</p>}
          {submitContact.isError && <p className="contact-error" role="alert">We could not send your message right now. Please try again shortly.</p>}
        </form>
      </main>
      <footer className="contact-footer">AI for Students · Learn the tool. Keep the thinking.</footer>
    </div>
  );
}
