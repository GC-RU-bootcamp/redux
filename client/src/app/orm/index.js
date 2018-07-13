import {ORM} from "redux-orm";
import { User, Session, PeopleSession } from "../models";

const orm = new ORM();
orm.register(User, Session, PeopleSession);
export default orm;
