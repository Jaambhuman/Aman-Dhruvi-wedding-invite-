 "use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
const mapUrl = process.env.NEXT_PUBLIC_RECEPTION_MAPS_URL || "https://www.google.com/maps/search/?api=1&query=Bhanushali+Wadi+Ghatkopar+Mumbai";

export default function Home() {
  const [rsvp, setRsvp] = useState({ name: "", phone: "", attending: "yes", guests: "2", message: "" });
  const [rsvpStatus, setRsvpStatus] = useState("");
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [photoStatus, setPhotoStatus] = useState("");

  async function submitRsvp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase) {
      setRsvpStatus("The RSVP form is ready, but the website owner needs to connect Supabase first. Please contact the family directly.");
      return;
    }
    setRsvpStatus("Sending your response…");
    const { error } = await supabase.from("rsvps").insert({
      name: rsvp.name, phone: rsvp.phone, attending: rsvp.attending === "yes",
      guest_count: Number(rsvp.guests), message: rsvp.message
    });
    setRsvpStatus(error ? "Sorry, we couldn't save your RSVP. Please try again or contact the family." : "Thank you! Your RSVP has been received. We can't wait to celebrate with you.");
    if (!error) setRsvp({ name: "", phone: "", attending: "yes", guests: "2", message: "" });
  }

  async function uploadPhotos(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!photos?.length) { setPhotoStatus("Please choose at least one photo."); return; }
    if (!supabase) { setPhotoStatus("Photo sharing will be available once the website owner connects Supabase."); return; }
    setPhotoStatus("Uploading your memories…");
    for (const file of Array.from(photos)) {
      const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;
      const { error } = await supabase.storage.from("wedding-photos").upload(safeName, file);
      if (error) { setPhotoStatus("One or more photos could not be uploaded. Please try again."); return; }
    }
    setPhotoStatus("Your photos have been shared. Thank you for adding to our memories!");
    setPhotos(null);
    const input = document.getElementById("photo-input") as HTMLInputElement | null;
    if (input) input.value = "";
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#home">A <span>♥</span> D</a>
        <div className="navlinks"><a href="#celebrations">Celebrations</a><a href="#story">Our story</a><a href="#rsvp">RSVP</a><a href="#memories">Memories</a></div>
        <a className="nav-cta" href="#rsvp">Join us <span>↗</span></a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-glow" />
        <div className="hero-content">
          <p className="eyebrow">WITH THE BLESSINGS OF OUR FAMILIES</p>
          <div className="ornament">✳　✧　✳</div>
          <h1>Aman <i>&</i><br/>Dhruvi</h1>
          <p className="hero-sub">A beautiful beginning. A lifetime together.</p>
          <div className="hero-rule"><span /> <b>2 — 3 JANUARY 2027</b> <span /></div>
          <a className="gold-button" href="#celebrations">Explore our celebration <span>↓</span></a>
        </div>
        <div className="hero-bottom"><span>MUMBAI · INDIA</span><span>OUR WEDDING JOURNEY</span></div>
      </section>

      <section className="intro section" id="story">
        <p className="eyebrow">TWO HEARTS, ONE JOURNEY</p>
        <h2>Some beginnings are<br/><i>written in the stars.</i></h2>
        <p className="intro-copy">With the love and blessings of our families, we invite you to be part of the moments that begin our forever. Your presence will make our celebrations even more meaningful.</p>
        <div className="name-meanings">
          <div><span className="initial">A</span><h3>Aman</h3><p>Peace beyond the mind</p></div>
          <div className="meaning-divider">✧</div>
          <div><span className="initial">D</span><h3>Dhruvi</h3><p>Constancy, like the eternal star</p></div>
        </div>
      </section>

      <section className="events section" id="celebrations">
        <div className="section-heading"><p className="eyebrow">SAVE THE DATES</p><h2>Our <i>celebrations</i></h2><p>Every moment is more special with you by our side.</p></div>
        <div className="event-grid">
          <article className="event-card featured">
            <div className="event-number">01 / THE WEDDING</div><div className="event-flower">✳</div>
            <p className="event-date">SATURDAY & SUNDAY</p><h3>The Wedding</h3><p className="event-day">2 – 3 January 2027</p>
            <div className="event-line" /><p className="event-detail">Two days of rituals, joy and the beginning of forever.</p><p className="pending">Detailed schedule & venue to follow</p>
          </article>
          <article className="event-card">
            <div className="event-number">02 / THE RECEPTION</div><div className="event-flower">✳</div>
            <p className="event-date">SUNDAY · 10 JANUARY 2027</p><h3>The Reception</h3><p className="event-day">7:00 PM onwards</p>
            <div className="event-line" /><p className="event-detail">An evening of celebration, togetherness and cherished memories.</p>
            <p className="venue">Bhanushali Wadi, Ghatkopar</p><a className="text-link" href={mapUrl} target="_blank" rel="noreferrer">View directions ↗</a>
          </article>
        </div>
      </section>

      <section className="quote-band">
        <span>“</span><p>In the divine presence, may peace meet a love that remains constant.</p><small>— AMAN & DHRUVI</small>
      </section>

      <section className="rsvp-section section" id="rsvp">
        <div className="rsvp-copy"><p className="eyebrow">KINDLY RESPOND</p><h2>Will you be<br/><i>celebrating with us?</i></h2><p>Let us know if you'll be joining. It will help us make the arrangements for a wonderful celebration.</p><div className="rsvp-stamp">A little note<br/><b>just for you</b><span>♥</span></div></div>
        <form className="rsvp-form" onSubmit={submitRsvp}>
          <label>Your name<input required value={rsvp.name} onChange={e=>setRsvp({...rsvp,name:e.target.value})} placeholder="Full name"/></label>
          <label>Mobile number<input value={rsvp.phone} onChange={e=>setRsvp({...rsvp,phone:e.target.value})} placeholder="+91" /></label>
          <label>Will you be joining us?<select value={rsvp.attending} onChange={e=>setRsvp({...rsvp,attending:e.target.value})}><option value="yes">Happily, yes!</option><option value="no">Sorry, can't make it</option></select></label>
          <label>Number of guests (including you)<select value={rsvp.guests} onChange={e=>setRsvp({...rsvp,guests:e.target.value})}>{[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n} value={n}>{n}</option>)}</select></label>
          <label>A message for us <span className="optional">(optional)</span><textarea rows={3} value={rsvp.message} onChange={e=>setRsvp({...rsvp,message:e.target.value})} placeholder="Share a note…"/></label>
          <button className="submit-button" type="submit">Send RSVP <span>↗</span></button>
          {rsvpStatus && <p className="form-status" role="status">{rsvpStatus}</p>}
        </form>
      </section>

      <section className="memories section" id="memories">
        <p className="eyebrow">THE MOMENTS WE'LL KEEP</p><h2>Share your <i>memories</i></h2>
        <p className="memories-copy">Be our memory makers. Upload the photographs you capture during the celebrations and help us see the day through your eyes.</p>
        <form className="upload-box" onSubmit={uploadPhotos}>
          <div className="upload-icon">＋</div><label htmlFor="photo-input">Choose your photographs</label>
          <input id="photo-input" type="file" accept="image/*" multiple onChange={(e:ChangeEvent<HTMLInputElement>)=>setPhotos(e.target.files)}/>
          <small>{photos?.length ? `${photos.length} photo(s) selected` : "JPG, PNG or HEIC · Multiple photos welcome"}</small>
          <button className="upload-button" type="submit">Share photographs ↗</button>
          {photoStatus && <p className="form-status" role="status">{photoStatus}</p>}
        </form>
      </section>

      <section className="closing">
        <div className="closing-ornament">✧　✳　✧</div><p>We can't wait to celebrate</p><h2>with you.</h2><div className="closing-names">AMAN <span>&</span> DHRUVI</div><small>JANUARY 2027 · MUMBAI</small>
      </section>
      <footer><span>MADE WITH LOVE</span><span>A & D · 2027</span><a href="#home">BACK TO TOP ↑</a></footer>
    </main>
  );
}