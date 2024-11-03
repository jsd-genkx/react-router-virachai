import { Form, useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";
import { getContact } from "../contacts";

export async function loader({ params }) {
  if (!params) return null;
  const contact = await getContact(params.contactId);
  return { contact };
}

Favorite.propTypes = {
  favorite: PropTypes.bool.isRequired,
};

export default function Contact() {
  let { contact } = useLoaderData();
  // if (!contact)
  //   contact = {
  //     first: "Your",
  //     last: "Name",
  //     avatar: "https://robohash.org/you.png?size=200x200",
  //     twitter: "your_handle",
  //     notes: "Some notes",
  //     favorite: true,
  //   };
  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={
            contact.avatar ||
            `https://robohash.org/${contact.id}.png?size=200x200`
          }
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite favorite={contact && contact.favorite} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ favorite }) {
  if (!favorite) return <></>;
  // if (!contact || !contact.favorite) return <></>;
  // const favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
