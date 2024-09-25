declare namespace JSX {
    interface IntrinsicElements {
      'trix-editor': React.DetailedHTMLProps<React.HTMLAttributes<HTMLTrixEditorElement>, HTMLTrixEditorElement> & { input: string };
    }
  }
  
  interface HTMLTrixEditorElement extends HTMLElement {
    // You can add any additional properties or methods specific to Trix editor here if needed
  }
  