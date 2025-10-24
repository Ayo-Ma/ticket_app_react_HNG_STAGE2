const KEY = "ticketapp_tickets";

export const getTickets = () => {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveTickets = (tickets) => {
  localStorage.setItem(KEY, JSON.stringify(tickets));
};
