"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1891],{269:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>o,toc:()=>h});var i=t(5893),s=t(1151);const a={},l="Plugins In-Depth",o={permalink:"/TaskWeaver/blog/plugin",editUrl:"https://github.com/microsoft/TaskWeaver/tree/main/website/blog/plugin.md",source:"@site/blog/plugin.md",title:"Plugins In-Depth",description:"**Pre-requisites**: Please refer to the Introduction and the Plugin Development",date:"2024-07-02T10:24:42.000Z",formattedDate:"July 2, 2024",tags:[],readingTime:4.685,hasTruncateMarker:!1,authors:[],frontMatter:{},unlisted:!1,prevItem:{title:"How to evaluate a LLM agent?",permalink:"/TaskWeaver/blog/evaluation"},nextItem:{title:"Roles in TaskWeaver",permalink:"/TaskWeaver/blog/role"}},r={authorsImageUrls:[]},h=[{value:"Plugin Basics",id:"plugin-basics",level:2},{value:"Configurations and States",id:"configurations-and-states",level:2},{value:"The Plugin Lifecycle",id:"the-plugin-lifecycle",level:2},{value:"Conclusion",id:"conclusion",level:2}];function c(e){const n={a:"a",code:"code",em:"em",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.em,{children:[(0,i.jsx)(n.strong,{children:"Pre-requisites"}),": Please refer to the ",(0,i.jsx)(n.a,{href:"/docs/plugin/plugin_intro",children:"Introduction"})," and the ",(0,i.jsx)(n.a,{href:"/docs/plugin/how_to_develop_a_new_plugin",children:"Plugin Development"}),"\npages for a better understanding of the plugin concept and its development process."]})}),"\n",(0,i.jsx)(n.h2,{id:"plugin-basics",children:"Plugin Basics"}),"\n",(0,i.jsxs)(n.p,{children:["In TaskWeaver, the plugins are the essential components to extend the functionality of the agent.\nSpecifically, a plugin is a piece of code wrapped in a class that can be called as a function by the agent in the generated code snippets.\nThe following is a simple example of a plugin that generates ",(0,i.jsx)(n.code,{children:"n"})," random numbers:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:"from taskweaver.plugin import Plugin, register_plugin\n\n@register_plugin\nclass RandomGenerator(Plugin):\n    def __call__(self, n: int):\n        import random\n        return [random.randint(1, 100) for _ in range(n)]\n"})}),"\n",(0,i.jsxs)(n.p,{children:["In this example, the ",(0,i.jsx)(n.code,{children:"RandomGenerator"})," class inherits the ",(0,i.jsx)(n.code,{children:"Plugin"})," class and implements the ",(0,i.jsx)(n.code,{children:"__call__"})," method, which means\nit can be called as a function. What would be the function signature of the plugin?\nIt is defined in the associated YAML file. For example, the YAML file for the ",(0,i.jsx)(n.code,{children:"RandomGenerator"})," plugin is as follows:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"name: random_generator\nenabled: true\nrequired: true\ndescription: >-\n  This plugin generates n random numbers between 1 and 100.\nexamples: |-\n  result = random_generator(n=5)\nparameters:\n  - name: n\n    type: int\n    required: true\n    description: >-\n      The number of random numbers to generate.\n\nreturns:\n  - name: result\n    type: list\n    description: >-\n      The list of random numbers.\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The YAML file specifies the name, description, parameters, and return values of the plugin.\nWhen the LLM generates the code snippets, it will use the information in the YAML file to generate the function signature.\nWe did not check the discrepancy between the function signature in the Python implementation and the YAML file.\nSo, it is important to keep them consistent.\nThe ",(0,i.jsx)(n.code,{children:"examples"})," field is used to provide examples of how to use the plugin for the LLM."]}),"\n",(0,i.jsx)(n.h2,{id:"configurations-and-states",children:"Configurations and States"}),"\n",(0,i.jsxs)(n.p,{children:["Although the plugin is used as a function in the code snippets, it is more than a normal Python function.\nThe plugin can have its own configurations and states.\nFor example, the ",(0,i.jsx)(n.code,{children:"RandomGenerator"})," plugin can have a configuration to specify the range of the random numbers.\nThe configurations can be set in the YAML file as follows:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"# the previous part of the YAML file\nconfigurations:\n  - name: range\n    type: list\n    required: false\n    description: >-\n      The range of the random numbers.\n    default: [1, 100]\n"})}),"\n",(0,i.jsxs)(n.p,{children:["We did not show how to use the configurations in the plugin implementation,\nwhich could be found in one of our sample plugins, namely ",(0,i.jsx)(n.a,{href:"https://github.com/microsoft/TaskWeaver/blob/main/project/plugins/sql_pull_data.yaml",children:"sql_pull_data"}),".\nSupporting configurations in the plugin is a powerful feature to make the plugin more flexible and reusable.\nFor example, we can have multiple YAML files pointing to the same Python implementation but with different configurations.\nRead this ",(0,i.jsx)(n.a,{href:"/docs/plugin/multi_yaml_single_impl",children:"page"})," for more details. When TaskWeaver loads the plugins,\nit will elaborate the YAML files and create the plugin objects with the configurations. Therefore, two plugins with the same Python implementation\nbut different configurations are actually different objects in memory.\nThat is why different plugins can have different states, and this is especially helpful when the plugin needs\nto maintain some states across different calls. Consider the example of the ",(0,i.jsx)(n.code,{children:"sql_pull_data"})," sample plugin, which has the following\ncode snippet:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'@register_plugin\nclass SqlPullData(Plugin):\n    db = None\n\n    def __call__(self, query: str):\n        ...\n\n        if self.db is None:\n            self.db = SQLDatabase.from_uri(self.config.get("sqlite_db_path"))\n'})}),"\n",(0,i.jsxs)(n.p,{children:["In the example above, the ",(0,i.jsx)(n.code,{children:"SqlPullData"})," plugin maintains a database connection across different calls.\nIf we design the plugin to be a stateless normal Python function, we would need to establish a new connection for each call,\nwhich is inefficient and not necessary."]}),"\n",(0,i.jsx)(n.h2,{id:"the-plugin-lifecycle",children:"The Plugin Lifecycle"}),"\n",(0,i.jsxs)(n.p,{children:["The plugin lifecycle is the process of how the plugin is loaded, initialized, and called by the agent.\nWhen TaskWeaver starts, it goes through all the plugin configuration files in the ",(0,i.jsx)(n.code,{children:"plugins"})," directory\nand creates the plugin entries in the memory. The Python implementation of the plugin is not loaded at this stage.\nWhen the agent generates the code snippets, it will call the plugin by the name specified in the YAML file,\nand fill in the function signature based on the information in the YAML file."]}),"\n",(0,i.jsxs)(n.p,{children:["The plugin is loaded and initialized when the code executor executes the code snippets for the first time\nin a session.\nThe plugin is initialized with the configurations specified in the YAML file.\nAlthough we have the ",(0,i.jsx)(n.a,{href:"/docs/advanced/plugin_selection",children:"feature"})," to dynamically select the plugins in the LLM, all the plugins are loaded\nno matter whether they are used in the current conversation round. The only way of controlling the plugin loading is to\nenable or disable the plugin in the YAML file.\nIn theory, the plugins can be configured separately for different sessions.\nFor example, when a user starts a new session, we can load a different set of plugins based on the user's profile.\nBut this feature is ",(0,i.jsx)(n.strong,{children:"not"})," supported in TaskWeaver yet."]}),"\n",(0,i.jsx)(n.p,{children:"The plugin is called when the agent executes the code snippets. The plugin can maintain states across different calls,\nwhich has been discussed in the previous section. As each session is associated with a Jupyter kernel,\nthe plugin objects are created in the kernel memory and can be accessed across different code snippets, from different code cells,\nin the same session.\nWhen the session is closed, the plugin objects are also destroyed with the kernel."}),"\n",(0,i.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsx)(n.p,{children:"In this page, we discussed the basics of the plugin in TaskWeaver, including the plugin implementation, the YAML file,\nthe configurations, and the states. We also introduced the plugin lifecycle, which is the process of how the plugin is loaded, initialized, and called by the agent.\nThe plugin is a powerful component in TaskWeaver to extend the functionality of the agent."})]})}function d(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>l});var i=t(7294);const s={},a=i.createContext(s);function l(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);