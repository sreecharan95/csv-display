# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## CSV - Application: 

###  To run the application
--> git clone  
--> npm install 
--> npm run dev 

It does two things: 
1) If the user uploads a CSV file of supplier-items, it will validate it and then take the user to another page displaying the table of uploaded data. The user can sort columns, show or hide them of freeze them as per his/her requirements.
The table neatly displays the material rate of various suppliers and its variation from the base rate.

2) In the second case, the user can uploaded a CSV that has heirarchy in the tabular data, i.e. in the form od categories and sub-categories. After successful upload, the application takes the user to another page displaying the tree-based structure of the heirarchy that is present in the tabular data. The tree also displays weighted averages of rates of various materials based on the category.

3) The user can select what is the CSV type that he/she is uploading.
