import instagramIcon from "../assets/instagram-icon.svg";
import facebookIcon from "../assets/facebook-icon.svg";
import xIcon from "../assets/x-icon.svg";
import youtubeIcon from "../assets/youtube-icon.svg";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-social" aria-label="Redes sociales">
          <a
            className="footer-social-link"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
          >
            <img
              src={instagramIcon}
              alt=""
              width="18"
              height="18"
              aria-hidden="true"
            />
          </a>

          <a
            className="footer-social-link"
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="Facebook"
          >
            <img
              src={facebookIcon}
              alt=""
              width="18"
              height="18"
              aria-hidden="true"
            />
          </a>

          <a
            className="footer-social-link"
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            title="X (Twitter)"
          >
            <img src={xIcon} alt="" width="18" height="18" aria-hidden="true" />
          </a>

          <a
            className="footer-social-link"
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            title="YouTube"
          >
            <img
              src={youtubeIcon}
              alt=""
              width="18"
              height="18"
              aria-hidden="true"
            />
          </a>
        </div>

        <p>Proyecto Final - Bootcamp Neoland Web Developement</p>
      </div>
    </footer>
  );
}

export default Footer;
