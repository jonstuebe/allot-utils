module.exports = ({ name, description, author, content, peerDependencies }) => `
# ${name}

${description}

## Install

\`\`\`
yarn add ${name} ${Object.keys(peerDependencies).join(" ")}
\`\`\`

or with npm:

\`\`\`
npm i ${name} ${Object.keys(peerDependencies).join(" ")}
\`\`\`

${content}

&copy; 2020 ${author}
`;
