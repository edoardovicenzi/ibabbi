import { type FormEvent, useRef, useState } from "react";
import { addList } from "../utilities/db";
import { useNavigate } from "react-router-dom";
import type { Person } from "../types";
import logo from "../assets/Logo.png";
import { EmailAdapter, EmailJSProvider } from "../utilities/email";
import { generateSecretFriends } from "../utilities/array";

export default function Home() {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [listaNomi, setListaNomi] = useState([] as Person[]);

  function addInfo() {
    if (newName.length === 0) return;
    if (newEmail.length === 0 || !newEmail.includes("@")) return;

    setListaNomi((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: newName,
        email: newEmail,
        isDisabled: false,
      },
    ]);
    setNewName("");
    setNewEmail("");
  }
  function removeName(id: string) {
    setListaNomi((prev) => prev.filter((el) => el.id !== id));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (listaNomi.length < 3) {
      ot.toast("Perfavore inserisci almeno 3 nomi!", "Warning", {
        variant: "warning",
        placement: "top-center",
      });
      return;
    }

    let shuffledFriends = generateSecretFriends(listaNomi);
    let refId = await addList(shuffledFriends);

    const emailAdapter = new EmailAdapter(new EmailJSProvider());
    for (const friend of shuffledFriends) {
      emailAdapter.sendEmail(friend.email, "", "", {
        url: `https://github.com/edoardovicenzi/ibabbi/secret/${refId}?id=${friend.id}`,
      });
    }
    ot.toast("Email inviate! Buoni Babbi!", "Fatto!", {
      variant: "success",
      placement: "top-center",
    });
  }

  return (
    <div className="homepage">
      <div className="flex">
        <img className="logo" src={logo} alt="Home" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="vstack">
          <h2>Crea la tua lista!</h2>
          <input
            type="text"
            placeholder={"Inserisci il prossimo nome"}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Inserisci l'email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button
            className="bx bx-plus outline"
            data-variant="outline"
            type="button"
            onClick={() => addInfo()}
          />
          {listaNomi.map((el) => (
            <article className="card" key={el.id}>
              <header>
                <h3>{el.name}</h3>
                <p>{el.email}</p>
              </header>
              <footer className="mt-4">
                <button
                  className="bx bx-trash outline"
                  data-variant="danger"
                  type="button"
                  onClick={() => removeName(el.id)}
                />
              </footer>
            </article>
          ))}
          <button type="submit">Fatto!</button>
        </div>
      </form>
    </div>
  );
}
