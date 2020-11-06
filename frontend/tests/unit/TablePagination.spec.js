import { mount } from '@vue/test-utils'
import TablePagination from '@/components/TablePagination.vue'

const factory = (props) => {
  return mount(TablePagination, {
    props: {
      totalPages: 12,
      currentPage: 2,
      ...props
    }
  })
}

describe('TablePagination.vue', () => {
  describe('with minimal props', () => {
    describe('previous and next buttons', () => {
      it('render when there are > 1 pages', () => {
        expect.assertions(2);

        const wrapper = factory();

        expect(wrapper.find('[data-test-previous]').text()).toBe('Previous')
        expect(wrapper.find('[data-test-next]').text()).toBe('Next')
      })
      it('do not render when there is only 1 page', () => {
        expect.assertions(2);

        const wrapper = factory({ totalPages: 1, currentPage: 1 });

        expect(wrapper.find('[data-test-previous]').exists()).toBeFalsy();
        expect(wrapper.find('[data-test-next]').exists()).toBeFalsy();
      })

      describe('with slots', () => {
        it('renders slot content', () => {
          expect.assertions(2);

          const wrapper = mount(TablePagination, {
            props: {
              totalPages: 12,
              currentPage: 2,
            },
            slots: {
              previous: '<span>Go back :(</span>',
              next: '<span>Go to next :)</span>'
            }
          })

          expect(wrapper.find('[data-test-previous]').text()).toBe('Go back :(')
          expect(wrapper.find('[data-test-next]').text()).toBe('Go to next :)')
        })
      });
    });

    describe('renders correct range of page buttons', () => {
      it('with multiple pages', () => {
        expect.assertions(2);

        const wrapper = factory();

        expect(wrapper.find('[data-test-page="1"]').exists()).toBeTruthy();
        expect(wrapper.find('[data-test-page="12"]').exists()).toBeTruthy();
      })

      it('with 1 page', () => {
        expect.assertions(2);

        const wrapper = factory({ currentPage: 1, totalPages: 1 });

        expect(wrapper.find('[data-test-page="1"]').exists()).toBeTruthy();
        expect(wrapper.find('[data-test-page="2"]').exists()).toBeFalsy();
      })
    })

    it('sets the correct page as current-page', () => {
      expect.assertions(2);

      const wrapper = factory();

      expect(wrapper.find('[data-test-page="2"]').classes()).toContain('is-current');
      expect(wrapper.find('[data-test-page="3"]').classes()).not.toContain('is-current');
    })

    it('does not render per-page selection', () => {
      expect.assertions(1);

      const wrapper = factory({ });

      expect(wrapper.find('[data-test-per-page]').exists()).toBeFalsy();
    })

    describe('onClick', () => {
      it('previous page emits page - 1', async () => {
        expect.assertions(1);

        const wrapper = factory();

        await wrapper.find('[data-test-previous]').trigger('click');

        expect(wrapper.emitted('set-page')[0][0]).toBe(1);
      })
      it('next page emits page + 1', async () => {
        expect.assertions(1);

        const wrapper = factory();

        await wrapper.find('[data-test-next]').trigger('click');

        expect(wrapper.emitted('set-page')[0][0]).toBe(3);
      })
      it('specific page emits number of page', async () => {
        expect.assertions(1);

        const wrapper = factory();

        await wrapper.find('[data-test-page="3"]').trigger('click');

        expect(wrapper.emitted('set-page')[0][0]).toBe(3);
      })
    })

    describe('disabled states', () => {
      it('previous page is disabled when currentPage is 1', async () => {
        expect.assertions(2);

        const wrapper = factory({ currentPage: 1 });

        const previousBtn = wrapper.find('[data-test-previous]');

        expect(previousBtn.attributes().disabled).toBe('true');

        await previousBtn.trigger('click');

        expect(wrapper.emitted()).not.toHaveProperty('set-page');
      })
      it('next page is disabled when currentPage is last in range', async () => {
        expect.assertions(2);

        const wrapper = factory({ currentPage: 12 });

        const nextBtn = wrapper.find('[data-test-next]');

        expect(nextBtn.attributes().disabled).toBe('true');

        await nextBtn.trigger('click');

        expect(wrapper.emitted()).not.toHaveProperty('set-page');
      })
      it('does not emit event when currentPage is clicked', async () => {
        expect.assertions(1);

        const wrapper = factory();

        await wrapper.find('[data-test-page="2"]').trigger('click');

        expect(wrapper.emitted()).not.toHaveProperty('set-page');
      })
    })
  })

  describe('with per-page prop', () => {
    it('renders per-page selector with [10,25,50] as options', () => {
      expect.assertions(7);

      const wrapper = factory({ perPage: 10 });

      expect(wrapper.find('[data-test-per-page]').exists()).toBeTruthy();

      const options = wrapper.find('[data-test-per-page]').findAll('option');

      expect(options[0].element.value).toBe('10');
      expect(options[0].element.selected).toBeTruthy();

      expect(options[1].element.value).toBe('25');
      expect(options[1].element.selected).toBeFalsy();

      expect(options[2].element.value).toBe('50');
      expect(options[2].element.selected).toBeFalsy();
    });
    it('emits per-page event on select', async () => {
      expect.assertions(1);

      const wrapper = factory({ perPage: 10 });

      const options = wrapper.find('select').findAll('option');

      await options[1].setSelected();

      expect(wrapper.emitted('set-per-page')[0][0]).toBe('25');
    })
  })
})

