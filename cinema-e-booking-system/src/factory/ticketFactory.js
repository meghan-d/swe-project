class Ticket {
    constructor(seatLabel, type) {
      this.seatLabel = seatLabel;
      this.type = type;
    }
  
    getPrice() {
      throw new Error("needs to be implemented by subclass");
    }
  }
  
  export class AdultTicket extends Ticket {
    constructor(seatLabel) {
      super(seatLabel, "Adult");
    }
  
    getPrice() {
      return 10;
    }
  }
  
  export class ChildTicket extends Ticket {
    constructor(seatLabel) {
      super(seatLabel, "Child");
    }
  
    getPrice() {
      return 7;
    }
  }
  
  export class SeniorTicket extends Ticket {
    constructor(seatLabel) {
      super(seatLabel, "Senior");
    }
  
    getPrice() {
      return 8;
    }
  }
  
  export class MilitaryTicket extends Ticket {
    constructor(seatLabel) {
      super(seatLabel, "Military");
    }
  
    getPrice() {
      return 8;
    }
  }
  
  export function TicketFactory(seatLabel, ticketType) {
    switch (ticketType) {
      case "Adult":
        return new AdultTicket(seatLabel);
      case "Child":
        return new ChildTicket(seatLabel);
      case "Senior":
        return new SeniorTicket(seatLabel);
      case "Military":
        return new MilitaryTicket(seatLabel);
      default:
        throw new Error(`Invalid ticket type: ${ticketType}`);
    }
  }
  