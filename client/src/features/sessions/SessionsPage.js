import React, { Component } from 'react';
import { connect } from 'react-redux'
import orm from '../../app/orm/index.js';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css'

import { attendAsync } from "./sessionsActions.js"

const mapStatetoProps = state => {

  const session = orm.session(state.orm);
  const { Session, User } = session;

  const sessions = Session.all().toRefArray();

  const sessionsWithNames = sessions.map(session => {
    const person = User.withId(session.people_id)
    const person_name = person.fst_nam + " " + person.lst_nam
    return {
      ...session,
      person_name
    }
  })

  return {
    sessionsWithNames,
    people_id: state.login.data.id,
    logon_id: state.login.data.logon_id
   };
}

const actions = {
  attendAsync
}

class SessionsPage extends Component{
  render(){
    const { sessionsWithNames = [], people_id, logon_id, attendAsync } = this.props
    return(
      <div className="flex flex-column flex-auto items-center mt5">
        <Table
          width={1000}
          height={400}
          headerHeight={20}
          rowHeight={30}
          rowCount={sessionsWithNames.length}
          rowGetter={({ index }) => sessionsWithNames[index]}
        >
          <Column
            label='Name'
            dataKey='name'
            width={200}
          />
          <Column
            width={300}
            label='Description'
            dataKey='description'
          />
          <Column
            width={250}
            label='Date of Session'
            dataKey='item_date'
          />
          <Column
            width={250}
            label='Trainer'
            dataKey='person_name'
          />
          <Column
            width={250}
            label='Link'
            dataKey='id'
            cellRenderer={({cellData}) => <button onClick={() => attendAsync({people_id, logon_id, session_id: cellData})}>Register</button>}

          />

        </Table>
      </div>
    )
  }
}

export default connect(mapStatetoProps,actions)(SessionsPage);
