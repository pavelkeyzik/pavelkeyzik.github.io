import { MusicoPage } from './app.po';

describe('musico App', () => {
  let page: MusicoPage;

  beforeEach(() => {
    page = new MusicoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
