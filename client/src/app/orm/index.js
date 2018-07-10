import {ORM} from "redux-orm";
import { User, Session} from "../models";

const orm = new ORM();
orm.register(User, Session);
export default orm;
