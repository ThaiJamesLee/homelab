"use strict";(self.webpackChunkhomelab=self.webpackChunkhomelab||[]).push([[279],{8543:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var o=t(4848),l=t(8453);const i={},s="Pi-Hole",r={id:"Pi-Hole/install-pihole",title:"Pi-Hole",description:"Install and setup",source:"@site/docs/Pi-Hole/install-pihole.md",sourceDirName:"Pi-Hole",slug:"/Pi-Hole/install-pihole",permalink:"/homelab/docs/Pi-Hole/install-pihole",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/Pi-Hole/install-pihole.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"How to mount a new storage disk",permalink:"/homelab/docs/Proxmox/how-to-mount-storage"},next:{title:"Intro",permalink:"/homelab/docs/intro"}},a={},c=[{value:"Install and setup",id:"install-and-setup",level:2},{value:"Configure",id:"configure",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"pi-hole",children:"Pi-Hole"}),"\n",(0,o.jsx)(n.h2,{id:"install-and-setup",children:"Install and setup"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"curl -sSL https://install.pi-hole.net | bash\n"})}),"\n",(0,o.jsxs)(n.p,{children:["See: ",(0,o.jsx)(n.a,{href:"https://docs.pi-hole.net/main/basic-install/",children:"PiHole - Basic Install"})]}),"\n",(0,o.jsx)(n.h2,{id:"configure",children:"Configure"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"Set DNS to router ip"}),"\n",(0,o.jsx)(n.li,{children:"Add adlists"}),"\n",(0,o.jsx)(n.li,{children:"create exception group"}),"\n",(0,o.jsx)(n.li,{children:"configure router to use dns"}),"\n",(0,o.jsx)(n.li,{children:"configure dns name mappings"}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>r});var o=t(6540);const l={},i=o.createContext(l);function s(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:s(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);