import React from "react";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { createRoot } from "react-dom/client";
import './bootstrap.js'
import '../css/app.css';


createInertiaApp({
  resolve: (name) => import(`./Pages/${name}.jsx`).then((module) => module.default),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);
  },
});
