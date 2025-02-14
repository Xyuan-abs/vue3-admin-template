# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

```
vue3-admin-template
├─ .env.development
├─ .env.production
├─ .env.staging
├─ .eslintrc-auto-import.json
├─ babel.config.js
├─ eslint.config.js
├─ index.html
├─ jsconfig.json
├─ package.json
├─ pnpm-lock.yaml
├─ prettier.config.js
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ api
│  │  ├─ banner.js
│  │  ├─ classify.js
│  │  ├─ common.js
│  │  ├─ dictionary.js
│  │  ├─ mock.js
│  │  ├─ production.js
│  │  └─ user.js
│  ├─ App.vue
│  ├─ assets
│  │  ├─ 404_images
│  │  │  ├─ 404.png
│  │  │  └─ 404_cloud.png
│  │  ├─ avatar.gif
│  │  ├─ login_images
│  │  │  ├─ bg.webp
│  │  │  ├─ login_banner.webp
│  │  │  └─ login_form.png
│  │  └─ logo.png
│  ├─ components
│  │  ├─ HprtLoadingButton.vue
│  │  ├─ ins-card
│  │  │  └─ index.vue
│  │  ├─ ins-chart
│  │  │  ├─ composables
│  │  │  │  └─ useResize.js
│  │  │  └─ index.vue
│  │  ├─ ins-copy
│  │  │  └─ index.vue
│  │  ├─ ins-descriptions
│  │  │  └─ index.vue
│  │  ├─ ins-detail-back
│  │  │  └─ index.vue
│  │  ├─ ins-detail-page
│  │  │  └─ index.vue
│  │  ├─ ins-download
│  │  │  └─ index.vue
│  │  ├─ ins-editor
│  │  │  ├─ composables
│  │  │  │  ├─ useEditorConfig.js
│  │  │  │  ├─ useInit.js
│  │  │  │  └─ useToolbarConfig.js
│  │  │  └─ index.vue
│  │  ├─ ins-form
│  │  │  ├─ components
│  │  │  │  ├─ cascader
│  │  │  │  │  └─ index.vue
│  │  │  │  ├─ checkbox
│  │  │  │  │  └─ index.vue
│  │  │  │  ├─ city
│  │  │  │  │  ├─ composables
│  │  │  │  │  │  ├─ useSetAttrs.js
│  │  │  │  │  │  └─ useSetRules.js
│  │  │  │  │  └─ index.vue
│  │  │  │  ├─ file-list
│  │  │  │  │  └─ index.vue
│  │  │  │  ├─ input
│  │  │  │  │  └─ index.vue
│  │  │  │  ├─ input-number-with-unit
│  │  │  │  │  ├─ composables
│  │  │  │  │  │  ├─ useSetAttrs.js
│  │  │  │  │  │  └─ useSetRules.js
│  │  │  │  │  └─ index.vue
│  │  │  │  ├─ input-password
│  │  │  │  │  └─ index.vue
│  │  │  │  ├─ radio
│  │  │  │  │  └─ index.vue
│  │  │  │  ├─ select
│  │  │  │  │  └─ index.vue
│  │  │  │  ├─ single-img-upload
│  │  │  │  │  └─ index.vue
│  │  │  │  ├─ text
│  │  │  │  │  └─ index.vue
│  │  │  │  └─ tree-select
│  │  │  │     └─ index.vue
│  │  │  ├─ composables
│  │  │  │  ├─ useElement.js
│  │  │  │  ├─ useFetchData.js
│  │  │  │  ├─ useFormItemLink.js
│  │  │  │  ├─ useSetFormValue.js
│  │  │  │  ├─ useSetPlaceholder.js
│  │  │  │  ├─ useSetRules.js
│  │  │  │  └─ useSubmit.js
│  │  │  ├─ index.vue
│  │  │  └─ README.md
│  │  ├─ ins-form-inline
│  │  │  └─ index.vue
│  │  ├─ ins-loading-button
│  │  │  └─ index.vue
│  │  ├─ ins-pager
│  │  │  ├─ composables
│  │  │  │  └─ useSetAttrs.js
│  │  │  └─ index.vue
│  │  ├─ ins-panel
│  │  │  └─ index.vue
│  │  ├─ ins-table
│  │  │  ├─ components
│  │  │  │  └─ table-item
│  │  │  │     └─ index.vue
│  │  │  ├─ composables
│  │  │  │  ├─ useDrag.js
│  │  │  │  ├─ useSetAttrs.js
│  │  │  │  └─ useSetEvent.js
│  │  │  ├─ index.vue
│  │  │  └─ README.md
│  │  ├─ ins-upload
│  │  │  └─ index.vue
│  │  └─ views-components
│  │     ├─ part-list
│  │     │  ├─ composables
│  │     │  │  ├─ useParts.js
│  │     │  │  └─ useRepairPartList.js
│  │     │  └─ index.vue
│  │     └─ repair-order-dialog
│  │        ├─ AddressInfo.vue
│  │        ├─ composables
│  │        │  ├─ useAddressInfo.js
│  │        │  ├─ useRepairInfo.js
│  │        │  └─ useServiceInfo.js
│  │        ├─ index.vue
│  │        ├─ RepairInfo.vue
│  │        └─ ServiceInfo.vue
│  ├─ config
│  │  └─ system.js
│  ├─ hooks
│  │  ├─ useChangePassword.js
│  │  ├─ useDialog.js
│  │  ├─ useDialogOperation.js
│  │  ├─ useEditForm.js
│  │  ├─ useFetch.js
│  │  ├─ useForm.js
│  │  ├─ useOperation.js
│  │  ├─ usePager.js
│  │  └─ useTable.js
│  ├─ layout
│  │  ├─ components
│  │  │  ├─ AppHeader.vue
│  │  │  ├─ AppMain.vue
│  │  │  ├─ Breadcrumb.vue
│  │  │  ├─ Logo.vue
│  │  │  ├─ PageTabs.vue
│  │  │  ├─ side-bar
│  │  │  │  ├─ index.vue
│  │  │  │  └─ Item.vue
│  │  │  └─ UserCenter.vue
│  │  └─ index.vue
│  ├─ main.js
│  ├─ permission.js
│  ├─ plugins
│  │  └─ index.js
│  ├─ router
│  │  └─ index.js
│  ├─ store
│  │  ├─ index.js
│  │  └─ modules
│  │     ├─ dictionary.js
│  │     └─ user.js
│  ├─ styles
│  │  ├─ element-plus.scss
│  │  ├─ index.scss
│  │  ├─ ins.scss
│  │  ├─ theme.scss
│  │  └─ transition.scss
│  ├─ utils
│  │  ├─ auth.js
│  │  ├─ clipboard.js
│  │  ├─ common.js
│  │  ├─ date.js
│  │  ├─ directive.js
│  │  ├─ event-bus.js
│  │  ├─ index.js
│  │  ├─ numberCommon.js
│  │  ├─ request.js
│  │  ├─ storage.js
│  │  ├─ stringCommon.js
│  │  ├─ treeCommon.js
│  │  ├─ validate.js
│  │  └─ vue-validate.js
│  └─ views
│     ├─ 404.vue
│     ├─ dashboard
│     │  └─ index.vue
│     ├─ example
│     │  ├─ composables
│     │  │  ├─ useEditForm.js
│     │  │  ├─ useSearch.js
│     │  │  └─ useTable.js
│     │  ├─ EditDialog.vue
│     │  └─ index.vue
│     └─ login
│        └─ index.vue
├─ typings
│  └─ auto-imports.d.ts
└─ vite.config.js

```