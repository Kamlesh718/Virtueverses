import Logo from "../logo.png";

function About() {
  return (
    <div className="sm:flex sm:items-center sm:justify-center sm:h-[76vh] bg-violet-200 bg-gradient-to-r from-violet-300 to-violet-100 mt-0">
      <img
        src={Logo}
        alt="logo"
        className="h-[30vh] w-[30vh] lg:h-[75vh] lg:w-[75vh] sm:h-[50vh] sm:w-[50vh] p-8  rounded-lg invisible fixed sm:visible sm:static opacity-25 sm:opacity-40 md:opacity-75 lg:opacity-100"
      />
      <div className="text-white p-6 sm:overflow-y-scroll overflow-auto sm:h-[70vh] bg-violet-900 bg-opacity-80 sm:rounded-lg">
        <p className="mb-4">
          Welcome to{" "}
          <strong className="text-3xl font-bold">VirtueVerses</strong>, where
          words become a canvas for virtues, and every verse is crafted with
          purpose and meaning. Our blog is not just a collection of words; it's
          a celebration of virtues, inspiration, and insightful narratives.
        </p>
        <p className="mb-4">
          <strong className="text-xl">Slogan: </strong>"Virtue in Every Verses"
        </p>
        <p className="mb-4">
          At <strong className="text-2xl font-bold">VirtueVerses</strong>, we
          believe in the transformative power of words. Our slogan, "Virtue in
          Every Verses," encapsulates our commitment to creating content that
          goes beyond mere expression. Each verse you find here is carefully
          curated to embody values, virtues, and positivity.
        </p>
        <p className="mb-4">
          <strong className="text-xl">Mission</strong>
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>
            Inspiring Virtuous Living:{" "}
            <strong className="text-2xl font-bold">VirtueVerses</strong> is on a
            mission to inspire virtuous living through the art of storytelling.
            We aim to encourage our readers to reflect on the values that shape
            their lives and the lives of those around them.
          </li>
          <li>
            Diverse Perspectives, Common Virtues: Our blog brings together
            diverse voices and perspectives, united by a shared commitment to
            virtue. Whether through poetry, articles, or personal narratives, we
            strive to highlight the universal principles that connect us all.
          </li>
          <li>
            A Sanctuary for Thoughtful Reflection:{" "}
            <strong className="text-2xl font-bold">VirtueVerses</strong> is more
            than just a blog; it's a sanctuary for thoughtful reflection. We
            invite you to explore our content, engage in meaningful discussions,
            and discover the beauty of virtuous living in every verse.
          </li>
        </ul>
        <p className="mb-4">
          <strong className="text-xl">What to Expect</strong>
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>
            Poetry that Inspires: Immerse yourself in poetic expressions that
            touch the soul and inspire a deeper understanding of virtues.
          </li>
          <li>
            Thought-Provoking Articles: Explore articles that delve into the
            significance of virtues in our daily lives, offering insights and
            practical wisdom.
          </li>
          <li>
            Personal Narratives: Connect with personal narratives that share
            real stories of individuals embracing virtues and making a positive
            impact.
          </li>
        </ul>
        <p className="mb-4">
          <strong className="text-xl">Join Us on the Journey</strong>
        </p>
        <p>
          <strong className="text-2xl font-bold">VirtueVerses</strong> is more
          than a blog; it's a community of individuals passionate about living
          virtuously. Join us on this journey of exploration, introspection, and
          celebration of virtues. Let every verse be a source of inspiration,
          and let virtue resonate in every aspect of your life. Thank you for
          being part of the{" "}
          <strong className="text-2xl font-bold">VirtueVerses </strong>
          community.
        </p>
      </div>
    </div>
  );
}

export default About;
