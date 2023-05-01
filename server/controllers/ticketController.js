import asyncHandler from "express-async-handler";
import Ticket from "../models/ticketModel.js";

//Desc: Create new ticket
//Route: POST/api/tickets
//Access: Private
const createTicket = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  const ticket = new Ticket({
    name,
    email,
    message,
  });
  const createdTicket = await ticket.save();
  res.status(201).json(createdTicket);
});

//Desc:Get ticket by Id
//Route: GET/api/tickets/:id
//Access: Private
const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

//Desc:Get all tickets
//Route: GET/api/tickets
//Access: Private
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({});

  var statistics,
    qtyClosed,
    qtyNew,
    qtyOnHold,
    qtyAdmin,
    qtyManager,
    timeManager,
    timeAdmin;

  qtyClosed = tickets.reduce(
    (acc, ticket) => (ticket.status === "Closed" ? 1 : 0) + acc,
    0
  );
  qtyNew = tickets.reduce(
    (acc, ticket) => (ticket.status === "New" ? 1 : 0) + acc,
    0
  );
  qtyOnHold = tickets.reduce(
    (acc, ticket) => (ticket.status === "On hold" ? 1 : 0) + acc,
    0
  );
  qtyAdmin = tickets.reduce(
    (acc, ticket) => (ticket.modifiedBy === "Admin" ? 1 : 0) + acc,
    0
  );
  qtyManager = tickets.reduce(
    (acc, ticket) => (ticket.modifiedBy === "Manager" ? 1 : 0) + acc,
    0
  );
  timeManager = tickets.reduce((acc, ticket) => +ticket.timeManager + acc, 0);
  timeAdmin = tickets.reduce((acc, ticket) => +ticket.timeAdmin + acc, 0);

  statistics = {
    qtyClosed,
    qtyNew,
    qtyOnHold,
    qtyAdmin,
    qtyManager,
    timeManager,
    timeAdmin,
  };
  res.json({ tickets, statistics });
});

//Desc: Delete ticket
//Route: DELETE/api/tickets/:id
//Access: Private / Admin
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    await ticket.remove();
    res.json({ message: "Ticket has been deleted" });
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

//Desc: Open ticket
//Route: PUT/api/tickets/:id/open
//Access: Private / Admin
const openTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    ticket.open = true;
    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

//Desc: Upadte ticket
//Route: PUT/api/tickets/:id
//Access: Private / Admin
const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    ticket.commentAdmin = req.body.commentAdmin || ticket.commentAdmin;
    ticket.timeAdmin =
      +ticket.timeAdmin + +req.body.timeAdmin || ticket.timeAdmin;
    ticket.status = req.body.status || ticket.status;
    ticket.open = false;
    ticket.lastModified = Date.now();
    ticket.modifiedBy = "Admin";

    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

//Desc: Update Manager ticket
//Route: PUT/api/tickets/:id/manager
//Access: Private / Manager
const updateManagerTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    ticket.commentManager = req.body.commentManager || ticket.commentManager;
    ticket.timeManager =
      +ticket.timeManager + +req.body.timeManager || ticket.timeManager;
    ticket.status = req.body.status || ticket.status;
    ticket.open = false;
    ticket.lastModified = Date.now();
    ticket.modifiedBy = "Manager";

    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

export {
  createTicket,
  getTicketById,
  getTickets,
  deleteTicket,
  openTicket,
  updateTicket,
  updateManagerTicket,
};
