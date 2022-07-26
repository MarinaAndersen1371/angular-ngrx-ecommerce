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
//Access: Private / Admin
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({});
  res.json(tickets);
});

//Desc: Delete ticket
//Route: DELETE/api/tickets/:id
//Access: Private
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
    ticket.status = req.body.status || ticket.status;
    ticket.open = false;
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
};
