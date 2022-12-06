import Link from 'next/link';

const Footer = () => {
  return (
    <div className="footer">
      <a
        className="external-link"
        target="_blank"
        href="https://tinyletter.com/marycave"
        rel="noreferrer"
      >
        Subscribe to our newsletter
      </a>
    </div>
  );
};

export default Footer;
