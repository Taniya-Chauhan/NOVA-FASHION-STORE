function About() {
  return (
    <main className="about-page">

      <section className="about-hero">

        <p className="eyebrow">ABOUT NOVA</p>

        <h1>
          WE BELIEVE
          <br />
          <span>STYLE IS PERSONAL.</span>
        </h1>

        <p>
          NOVA was created for a new generation that
          believes fashion isn't about fitting in.
          It's about expressing who you are.
        </p>

      </section>

      <section className="about-content">

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85"
            alt="NOVA store"
          />
        </div>

        <div className="about-text">

          <p className="eyebrow">
            OUR PHILOSOPHY
          </p>

          <h2>
            SIMPLE DESIGN.
            <br />
            STRONG IDENTITY.
          </h2>

          <p>
            We create modern essentials that are
            easy to wear, easy to style and built
            around individuality.
          </p>

          <p>
            From everyday basics to statement
            pieces, every NOVA product is designed
            with a focus on quality, comfort and
            contemporary style.
          </p>

        </div>

      </section>

    </main>
  );
}

export default About;