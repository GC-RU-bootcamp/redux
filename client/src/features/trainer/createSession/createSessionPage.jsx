import React from 'react';
import { connect } from 'react-redux';

import { createSessionAction, createSessionAsync } from "./createSessionActions.js"


const mapState = state => {
return {
  name: state.create.name,
  item_date: state.create.item_date,
  description: state.create.description,
  cost: state.create.cost,
  min_attendees: state.create.min_attendees,
  max_attendees: state.create.max_attendees,
  }
}

const actions = {
  createSessionAction,
  createSessionAsync,
}

const createSessionPage = ({  name, description, cost, min_attendees, max_attendees, item_date, createSessionAction, createSessionAsync }) => (
  <div className="flex flex-auto justify-center items-center">
    <form
      onSubmit={
        (e) => {
          e.preventDefault();
          createSessionAsync({ name, item_date, description, cost, min_attendees, max_attendees, })
        }}
      className="w-75 ba pa3 br2"
      action="createSession" method="get"
      acceptCharset="utf-8"
      >
      <fieldset id="create_session" className="ba b--transparent ph0 mh0">
            <div className="flex justify-around items-center">
              <div className="flex flex-column justify-between">
                <div className="mt3">
                  <label className="db fw4 lh-copy f6" htmlFor="name">Name</label>
                  <input className="pa2 input-reset ba bg-transparent" value={name} onChange={(e) => createSessionAction({name: e.target.value })} type="text" name="name"  id="name"></input>
                </div>
                <div className="mt3">
                  <label className="db fw4 lh-copy f6" htmlFor="description">Description</label>
                  <input className="pa2 input-reset ba bg-transparent" value={description} onChange={(e) => createSessionAction({description: e.target.value })}  type="text" name="description" id="description"></input>
                </div>
              </div>
              <div className="flex flex-column justify-between">
                <div className="mt3">
                  <label className="db fw4 lh-copy f6" htmlFor="cost">Cost</label>
                  <input className="b pa2 input-reset ba bg-transparent"  value={cost} onChange={(e) => createSessionAction({cost: e.target.value })} type="text" name="cost"  id="cost"></input>
                </div>
                <div className="mt3">
                  <label className="db fw4 lh-copy f6" htmlFor="item_date">Item Date</label>
                  <input className="b pa2 input-reset ba bg-transparent" value={item_date} onChange={(e) => createSessionAction({item_date: e.target.value })} type="text" name="date"  id="item_date"></input>
                </div>
              </div>
              <div className="flex flex-column justify-between">
                <div className="mt3">
                  <label className="db fw4 lh-copy f6" htmlFor="min_attendees">Min Clients</label>
                  <input className="b pa2 input-reset ba bg-transparent" value={min_attendees} onChange={(e) => createSessionAction({min_attendees: e.target.value })} type="text" name="min_attendees"  id="min_attendees"></input>
                </div>
                <div className="mt3">
                  <label className="db fw4 lh-copy f6" htmlFor="max_attendees">Max Clients</label>
                  <input className="pa2 input-reset ba bg-transparent"  value={max_attendees} onChange={(e) => createSessionAction({max_attendees: e.target.value })} id="max_attendees"></input>
                </div>
              </div>
            </div>
          </fieldset>
          <div className="mt3 flex justify-end">
            <input className="b br2 mr4 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Create Session"></input>
          </div>
        </form>
      </div>
    )

    export default connect(mapState, actions)(createSessionPage);
