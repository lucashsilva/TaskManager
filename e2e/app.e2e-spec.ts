import { SiLab02Page } from './app.po';

describe('si-lab-02 App', function() {
  let page: SiLab02Page;

  beforeEach(() => {
    page = new SiLab02Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
