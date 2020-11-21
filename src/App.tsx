import * as React from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Netflix Clone</h1>
      <p>
        Hi! Your assignment is to implement a movie streaming dashboard using
        TypeScript and React.
      </p>
      <h3>Tasks</h3>
      <ul>
        <li>
          Implement assignment using:
          <ul>
            <li>
              Language: <strong>TypeScript</strong>
            </li>
            <li>
              Framework: <strong>React</strong>
            </li>
          </ul>
        </li>
        <li>
          Build out the project to the designs inside the <code>/Designs</code>{" "}
          folder
        </li>
        <li>
          Connect your application to our Firebase app{" "}
          <strong>(configuration provided in constants folder)</strong>
        </li>
        <li>
          Register an account using Firebase Auth (Email &amp; Password
          provider).
        </li>
        <li>
          Login with your account details in order to view the app protected
          routes.
        </li>
        <li>
          Fetch movies data from Cloud Firestore <code>movies</code> collection.
        </li>
        <li>
          Group <code>movies</code> list in Homepage by <code>genere</code>.
        </li>
        <li>
          Create <code>genere</code> route to display only movies from this
          specific <code>genere</code>
        </li>
        <li>
          In <code>genre</code> route you can search by movie <code>title</code>{" "}
          field and you can sort movies ascending and descending by{" "}
          <code>year</code>
        </li>
        <li>
          Create <code>/movies/$id</code> route to display movie full details.
        </li>
        <li>A movie can be added to your watchlist</li>
        <li>
          Create a Firestore document in <code>watchlist</code> collection with
          document id equals to your account <code>uid</code>
        </li>
        <li>
          Your watchlist should contain an array of movies you&#39;ve previously
          added to your watchlist.
        </li>
        <li>
          Create <code>/watchlist/$id</code> route where you can check the list
          of the movies you&#39;ve previously added.
        </li>
        <li>Implement logout flow</li>
      </ul>
      <h3 id="evaluation-criteria">Evaluation Criteria</h3>
      <ul>
        <li>
          <strong>TypeScript</strong> and <strong>React</strong> best practices
        </li>
        <li>
          We&#39;re looking for you to produce working code, with enough room to
          demonstrate how to structure components in a small program.
        </li>
        <li>We&#39;re looking for you to produce a user friendly UI</li>
        <li>Completeness: did you complete the features?</li>
        <li>
          Correctness: does the functionality act in sensible, thought-out ways?
        </li>
        <li>Maintainability: is it written in a clean, maintainable way?</li>
      </ul>
    </div>
  );
}
