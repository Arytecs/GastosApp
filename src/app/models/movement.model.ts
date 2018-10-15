export class Movement {

    constructor(
        public id: string,
        public name: string,
        public amount: number,
        public category: string,
        public account: string,
        public userId: string,
        public created_at: string,
    ) {}
  }
