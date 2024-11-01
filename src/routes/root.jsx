import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { getContacts, createContact, deleteContactAll } from "../contacts";

export async function action() {
  const contact = await createContact();
  console.log("createContact");
  const contacts = await getContacts();
  return { contact };
}

export async function clear() {
  const contacts = await deleteContactAll();
  if (contacts.length) contacts = await deleteContactAll();
  if (contacts.length) contacts = await deleteContactAll();
  console.log("deleteContactAll");
  return { contacts };
}

export async function loader() {
  const contacts = await getContacts();
  console.log("rootLoader");
  return { contacts };
}

export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="button">
              <Link to={`contacts/new`}>NEW</Link>
            </button>
          </Form>
          <Form method="post">
            <button type="button">
              <Link to={`contacts/clear`}>CLEAR</Link>
            </button>
          </Form>
        </div>
        <nav>
          <ul>
            <li key="home">
              <Link to={`/`}>HOME</Link>
            </li>
            <li key="you">
              <Link to={`contacts/1`}>Your Name</Link>
            </li>
            <li key="friend">
              <Link to={`contacts/2`}>Your Friend</Link>
            </li>
          </ul>
          <hr />
          <br />
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
