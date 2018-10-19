export class Movement {

    constructor(
        public id: string,
        public name: string,
        public amount: number,
        public created_at: string,
        public category: string,
        public account: string,
        public userId: string,
    ) {}
  }
