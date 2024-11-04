import { useState } from "react";
import PropTypes from "prop-types";

Component2.propTypes = {
  handlePropChange: PropTypes.func.isRequired,
};
Component3.propTypes = {
  handlePropChange: PropTypes.func.isRequired,
};
Component4.propTypes = {
  handlePropChange: PropTypes.func.isRequired,
};
Component5.propTypes = {
  handlePropChange: PropTypes.func.isRequired,
};

// Top Component
export default function NoContext() {
  const [propValue, setPropValue] = useState("Initial Value");

  const handlePropChange = (newValue) => {
    setPropValue(newValue);
  };
  if (!handlePropChange) return <></>;
  return (
    <div>
      <p>Top Component: {propValue}</p>
      <p> &nbsp;</p>
      <div>
        <button onClick={() => setPropValue("Initial Value")}>
          Initial Value on Top Component
        </button>
      </div>
      <p> &nbsp;</p>
      <Component2 handlePropChange={handlePropChange} />
    </div>
  );
}

// Component 2
function Component2({ handlePropChange }) {
  return <Component3 handlePropChange={handlePropChange} />;
}

// Component 3
function Component3({ handlePropChange }) {
  return <Component4 handlePropChange={handlePropChange} />;
}

// Component 4
function Component4({ handlePropChange }) {
  return <Component5 handlePropChange={handlePropChange} />;
}

// Component 5
function Component5({ handlePropChange }) {
  const handleClick = () => {
    handlePropChange("New Value from Component5");
  };

  return (
    <div>
      <button onClick={handleClick}>
        Update Top Component from Component5
      </button>
    </div>
  );
}

/**
 * **Explanation:**

This component structure demonstrates a common pattern in React: **prop drilling**. 
The `handlePropChange` function is passed down from the `TopComponent` to `Component5` through intermediate components. 

When the button in `Component5` is clicked:
1. The `handleClick` function is triggered.
2. It calls the `handlePropChange` function, which is received by the `TopComponent`.
3. The `TopComponent` updates its state, causing a re-render and updating the displayed value.

**Key Considerations:**

- **Prop Drilling:** While effective for simple scenarios, prop drilling can become complex and less maintainable in larger applications with many nested components.
- **Context API:** The `useContext` hook offers a more elegant solution for sharing data across multiple levels of components, especially when the data is required by many components. 

**Best Practices:**

- For simple scenarios, prop drilling might suffice.
- For complex applications, consider using the Context API to reduce prop drilling and improve code readability.
- Always prioritize a balance between simplicity and maintainability when choosing a solution. 
*/
