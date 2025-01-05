type QueryParam = {
  name: string,
  value: string | number | boolean | null,
};

export interface AuthorQuery {
  params: () => QueryParam[],
}

export class ByName implements AuthorQuery {
  constructor(private readonly name: string) {
  }

  params() {
    return [{
      name: 'name',
      value: this.name,
    }];
  }
}
