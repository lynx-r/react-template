import React from 'react';

interface ExampleComponentProps {
  prop: string;
}

export const ExampleComponent = (props: ExampleComponentProps) => {
  return (
    <div>
      ExampleComponent {props.prop}
    </div>
  );
};
