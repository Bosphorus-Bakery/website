// Pull the google.maps global namespace into the compilation — TypeScript 6
// no longer auto-includes node_modules/@types packages, and these types are
// referenced by @vis.gl/react-google-maps and StoreLocator.
/// <reference types="google.maps" />
