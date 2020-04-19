import React from 'react';
import { ExampleComponent } from 'shared';

interface ExamplePageProps {

}

function ExamplePage(props: ExamplePageProps) {
  return (
    <div>
      ExamplePage
      <ExampleComponent prop="test prop"/>
    </div>
  );
}

export default ExamplePage;
