import { JointSchoolPage } from './app.po';

describe('joint-school App', function() {
  let page: JointSchoolPage;

  beforeEach(() => {
    page = new JointSchoolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
