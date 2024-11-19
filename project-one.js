import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class ProjectOne extends DDDSuper(I18NMixin(LitElement)) {
  /**
   * Define the custom element's tag name
   */
  static get tag() {
    return "project-one";
  }

  /**
   * Constructor to initialize default values
   */
  constructor() {
    super();
    this._initializeProperties(); // Call a method to set default property values
  }

  /**
   * Initialize component properties with default values
   */
  _initializeProperties() {
    this.siteName = ""; // Name of the site
    this.description = ""; // Brief description of the project
    this.logo = ""; // Path to the logo image
    this.theme = ""; // Theme associated with the project
    this.created = ""; // Creation date of the project
    this.lastUpdated = ""; // Last updated timestamp
    this.hexCode = ""; // Hexadecimal color code for theme accent
  }

  /**
   * Define the reactive properties for the component
   */
  static get properties() {
    return {
      ...super.properties,
      siteName: { type: String, reflect: true, attribute: "site-name" }, // Name of the site
      description: { type: String }, // Description of the project
      logo: { type: String }, // Logo for the project
      theme: { type: String }, // Theme name
      created: { type: String }, // Project creation date
      lastUpdated: { type: String }, // Last updated date
      hexCode: { type: String }, // Theme hex color code
    };
  }

  /**
   * Scoped styles for the component
   */
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary); /* Primary theme color */
          background-color: var(--ddd-theme-accent); /* Accent background color */
          font-family: var(--ddd-font-navigation); /* Navigation font style */
        }
        .wrapper {
          margin: var(--ddd-spacing-2); /* Spacing around the component */
          padding: var(--ddd-spacing-4); /* Inner padding for the wrapper */
        }
        h3 span {
          font-size: var(
            --project-one-label-font-size,
            var(--ddd-font-size-s) /* Default font size */
          );
        }
        /* Added styling for images to ensure they scale properly */
        img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: auto; /* Center align images */
        }
      `,
    ];
  }

  /**
   * Render the HTML structure for the component
   */
  render() {
    return html`
      <div class="wrapper">
        <h3>
          <span>${this.title || "Untitled"}</span> ${this.title || ""}
        </h3>
        ${this._renderPlanSection()} <!-- Render the "Plan" section -->
        ${this._renderDiagramSection()} <!-- Render the "Diagram Plan" section -->
        <slot></slot> <!-- Slot for additional content -->
      </div>
    `;
  }

  /**
   * Render the "Plan" section
   */
  _renderPlanSection() {
    return html`
      <h1>Plan</h1>
      <p>This section outlines the main plan for the project.</p>
    `;
  }

  /**
   * Render the "Diagram Plan" section
   */
  _renderDiagramSection() {
    return html`
      <h1>Diagram Plan</h1>
      <!-- Updated alt text for accessibility -->
      <img src="/lib/analyzer/Diagram.png" alt="Diagram showcasing the project plan" />
    `;
  }

  /**
   * HAX properties integration via file reference
   */
  static get haxProperties() {
    return new URL(
      `./lib/analyzer/${this.tag}.haxProperties.json`,
      import.meta.url
    ).href;
  }
}

globalThis.customElements.define(ProjectOne.tag, ProjectOne);
