import { MathPersonalAreaPage } from './app.po';

describe('math-personal-area App', () => {
  let page: MathPersonalAreaPage;

  beforeEach(() => {
    page = new MathPersonalAreaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
