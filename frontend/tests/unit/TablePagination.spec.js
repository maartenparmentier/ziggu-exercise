import { shallowMount } from '@vue/test-utils'
import TablePagination from '@/components/TablePagination.vue'

describe('TablePagination.vue', () => {
  it('renders table', () => {
    const wrapper = shallowMount(TablePagination);

    expect(wrapper.text()).toMatch(msg)
  })
})
