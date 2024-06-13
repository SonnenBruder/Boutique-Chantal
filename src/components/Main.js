import React, { useState, useEffect } from 'react';
import './style/Main.scss'
import AnfahrtPNG from './assets/media/anfahrt.PNG'
import Logo from './assets/media/Logolucent.png'

function Main() {
  useEffect(() => {
    var menuId;
    function init() {
      menuId = document.getElementById("menu");
      document.addEventListener("scroll", scrollMenu, false);
    }
    function scrollMenu() {
      if (document.documentElement.scrollTop > 50) {
        menuId.classList.add("scroll");
        console.log('scroll');
      }
      else {
        menuId.classList.remove("scroll");
        console.log('no-scroll');
      }
    }
    document.addEventListener("DOMContentLoaded", init, false);
  }, []);

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(prev => !prev);
  };

  return (
    <>
      <nav className="nav" id="menu">
        <div className="wrap">
          <div className="brand">
            <img src={Logo} alt="Logo" />
          </div>
          <button onClick={toggleMenu} id="mobile-btn" className={`hamburger-btn ${openMenu ? 'hamburger-cross' : ''}`}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          <ul className={openMenu ? "top-menu openMenu" : "top-menu closeMenu"} id="top-menu">
            <li><a href="#"><i className="fa fa-home" aria-hidden="true"></i></a></li>
            <li><a href="#zeiten">Öffnungszeiten</a></li>
            <li><a href="#Anfahrt">Anfahrt</a></li>
          </ul>
        </div>
      </nav>
      <header className="hero">
        <div className="content">
          <h1>Ihre exklusive Quelle für Mode und Eleganz</h1>
          <p>Bei uns finden Sie die neuesten Modetrends, erstklassige Qualität und unvergleichlichen Stil. Treten Sie ein und entdecken Sie, was Mode wirklich bedeuten kann.</p>
        </div>
      </header>
      <main className="main">
        <section>
          <div className="tab-row">
            <div className="col-12">
              <h2>Wir sind eine Boutique im Herzen der Stadt Esslingen am Neckar, </h2>
              <p>welche sich auf den Verkauf von Abendmode (auch Übergrößen) sowie Accessoires und Schuhen spezialisiert. Auch Männer können bei uns modische Anzüge finden.</p>
            </div>
          </div>
        </section>
        <section id='zeiten' className="feature">
          <div className="tab-row">
            <div className="col-12">
              <h2>Öffnungszeiten:</h2>
              <p>Mo. - Sa.: 10:00 - 18:30</p>
            </div>
          </div>
        </section>
        <section>
          <div className="tab-row">
            <div className="col">
              <h2>Abendkleider</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga porro sapiente, corporis dignissimos laudantium illo expedita corrupti asperiores esse quae.</p>
            </div>
            <div className="col">
              <h2>Accessoires</h2>
              <p>Repellat qui, dolores nemo asperiores incidunt quidem dolorum. Quos, deleniti neque architecto dolore magni aliquid. Inventore suscipit consequuntur excepturi ipsam.</p>
            </div>
            <div className="col">
              <h2>Schuhe</h2>
              <p>Doloribus perferendis a ipsum ad, consectetur animi aliquam maxime, earum aspernatur, ea commodi tempore suscipit explicabo cupiditate at nemo quae.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="row">
          <div className="col-5">
            <h3>Interessieren Sie sich für elegante und festlichen Mode? </h3>
            <p>Dann besuchen Sie uns doch in unserer Boutique Chantal</p>
          </div>
          <div className="col-1"></div>
          <div className="col-6">
            <p><i className="fa fa-phone" aria-hidden="true"></i>Tel. 0711 / 39 11 11 14</p>
            <p id='Anfahrt'>Anfahrt: Neckarstraße 11, 73728 Esslingen am Neckar</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2631.2951338176895!2d9.303254306027592!3d48.73805879430292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799c13722ae8e1d%3A0x1ee1d2a49603c01f!2sBoutique%20Chantal!5e0!3m2!1sde!2sde!4v1718278984313!5m2!1sde!2sde" width="400" height="300" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
           
          </div>
          

        </div>
        <div className="row">
          <div className="col-12">&copy; 2013 Boutique Chantal </div>
        </div>
      </footer>
    </>
  );
}

export default Main;
