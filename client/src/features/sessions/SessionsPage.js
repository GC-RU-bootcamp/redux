import React, { Component } from 'react';
import { connect } from 'react-redux'
import orm from '../../app/orm/index.js';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css'

const mapStatetoProps = state => {
  const session = orm.session(state.orm);
  const { Session } = session;
  const sessions = Session.all().toRefArray();
  return { sessions };
}

class SessionsPage extends Component{
  render(){
    const { sessions = [] } = this.props
    return(
      <div className="flex flex-column flex-auto items-center mt5">
        <Table
          width={1000}
          height={400}
          headerHeight={20}
          rowHeight={30}
          rowCount={sessions.length}
          rowGetter={({ index }) => sessions[index]}
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
            dataKey='people_id'
          />
          <Column
            width={250}
            label='Link'
            dataKey='conn_info'
            cellRenderer={({cellData}) => <button href={cellData}>Register</button>}

          />

        </Table>
      </div>
    )
  }
}

export default connect(mapStatetoProps)(SessionsPage);
