import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { Suspense } from "react";
import { getContacts, createContact, deleteContactAll } from "../contacts";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
// import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

export async function action() {
  const contact = await createContact();
  console.log("root createContact", contact);
  return { contact };
}

export async function clear() {
  const contacts = await deleteContactAll();
  console.log("root deleteContactAll", contacts);
  return { contacts };
}

export async function loader() {
  let contacts = await getContacts();
  console.log("root getContacts", contacts.length);
  return { contacts };
}

export default function Root() {
  const data = useLoaderData();
  if (data.isLoading) {
    console.log("data.isLoading", data);
    return <div>Loading...</div>;
  }
  if (data.isError) {
    console.log("data.isError", data);
    return <div>Error loading.</div>;
  }
  const { contacts } = data;
  if (!contacts) return <></>;
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
            {/* <li key="random">
              <Link to={`contacts/3`}>
                {Math.random().toString(36).substring(2, 9)}
              </Link>
            </li> */}
          </ul>
          <hr />
          <br />
          {contacts && contacts.length ? (
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
        <Suspense fallback={<div>loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
