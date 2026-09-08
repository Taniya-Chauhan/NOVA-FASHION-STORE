function Contact() {
  return (
    <main className="contact-page">

      <section className="page-header">
        <p className="eyebrow">GET IN TOUCH</p>

        <h1>CONTACT</h1>

        <p>
          Have a question? We'd love to hear from you.
        </p>
      </section>

      <section className="contact-container">

        <div className="contact-info">

          <h2>Let's talk.</h2>

          <p>
            Whether you have a question about your
            order, products or anything else,
            our team is here to help.
          </p>

          <div className="contact-item">
            <strong>Email</strong>
            <span>hello@nova.com</span>
          </div>

          <div className="contact-item">
            <strong>Phone</strong>
            <span>+91 98765 43210</span>
          </div>

          <div className="contact-item">
            <strong>Hours</strong>
            <span>Mon – Sat, 10 AM – 6 PM</span>
          </div>

        </div>

        <form
          className="contact-form"
          onSubmit={(e) => e.preventDefault()}
        >

          <label>Your Name</label>
          <input type="text" placeholder="Enter your name" />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Subject</label>
          <input
            type="text"
            placeholder="What is this about?"
          />

          <label>Message</label>
          <textarea
            rows="6"
            placeholder="Write your message..."
          ></textarea>

          <button type="submit" className="primary-btn">
            SEND MESSAGE
          </button>

        </form>

      </section>

    </main>
  );
}

export default Contact;