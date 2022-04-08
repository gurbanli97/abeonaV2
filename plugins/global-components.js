import Vue from "vue";

import Icon from "@/components/elements/Icon";
import Badge from "@/components/elements/Badge";
import Modal from "@/components/elements/Modal";
import FormField from "@/components/form/FormField";
import QueryField from "@/components/form/QueryField";
import DetailField from "@/components/elements/DetailField";
import PageHeader from "@/components/layout/PageHeader";
import UserTable from "@/components/tables/UserTable";
import DataTable from "@/components/tables/DataTable";
import SlideOut from "@/components/elements/SlideOut";

Vue.component("icon", Icon);
Vue.component("badge", Badge);
Vue.component("modal", Modal);
Vue.component("form-field", FormField);
Vue.component("query-field", QueryField);
Vue.component("detail-field", DetailField);
Vue.component("page-header", PageHeader);
Vue.component("user-table", UserTable);
Vue.component("data-table", DataTable);
Vue.component("slide-out", SlideOut);