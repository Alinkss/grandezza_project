import { Tab, initMDB } from 'mdb-ui-kit';

initMDB({ Tab });

const triggerTabList = [].slice.call(document.querySelectorAll('#ex1 a'));
triggerTabList.forEach((triggerEl) => {
  const tabTrigger = new Tab(triggerEl);

  triggerEl.addEventListener('click', (event) => {
    event.preventDefault();
    tabTrigger.show();
  });
});