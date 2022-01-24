<template>
  <div class="wrapper">
    <ul>
      <li>我是列表1</li>
      <li>我是列表2</li>
      <li>我是列表3</li>
      <li>我是列表4</li>
      <li>我是列表5</li>
      <li>我是列表6</li>
      <li>我是列表7</li>
      <li>我是列表8</li>
      <li>我是列表9</li>
      <li>我是列表10</li>
      <li>我是列表11</li>
      <li>我是列表12</li>
      <li>我是列表13</li>
      <li>我是列表14</li>
      <li>我是列表15</li>
      <li>我是列表16</li>
      <li>我是列表17</li>
      <li>我是列表18</li>
      <li>我是列表19</li>
      <li>我是列表20</li>
      <li>我是列表21</li>
      <li>我是列表22</li>
      <li>我是列表23</li>
      <li>我是列表24</li>
      <li>我是列表25</li>
      <li>我是列表26</li>
      <li>我是列表27</li>
      <li>我是列表28</li>
      <li>我是列表29</li>
      <li>我是列表30</li>
      <li>我是列表31</li>
      <li>我是列表32</li>
      <li>我是列表33</li>
      <li>我是列表34</li>
      <li>我是列表35</li>
      <li>我是列表36</li>
      <li>我是列表37</li>
      <li>我是列表38</li>
      <li>我是列表39</li>
      <li>我是列表40</li>
      <li>我是列表41</li>
      <li>我是列表42</li>
      <li>我是列表43</li>
      <li>我是列表44</li>
      <li>我是列表45</li>
      <li>我是列表46</li>
      <li>我是列表47</li>
      <li>我是列表48</li>
      <li>我是列表49</li>
      <li>我是列表50</li>
      <li>我是列表51</li>
      <li>我是列表52</li>
      <li>我是列表53</li>
      <li>我是列表54</li>
      <li>我是列表55</li>
      <li>我是列表56</li>
      <li>我是列表57</li>
      <li>我是列表58</li>
      <li>我是列表59</li>
      <li>我是列表60</li>
      <li>我是列表61</li>
      <li>我是列表62</li>
      <li>我是列表63</li>
      <li>我是列表64</li>
      <li>我是列表65</li>
      <li>我是列表66</li>
      <li>我是列表67</li>
      <li>我是列表68</li>
      <li>我是列表69</li>
      <li>我是列表70</li>
      <li>我是列表71</li>
      <li>我是列表72</li>
      <li>我是列表73</li>
      <li>我是列表74</li>
      <li>我是列表75</li>
      <li>我是列表76</li>
      <li>我是列表77</li>
      <li>我是列表78</li>
      <li>我是列表79</li>
      <li>我是列表80</li>
      <li>我是列表81</li>
      <li>我是列表82</li>
      <li>我是列表83</li>
      <li>我是列表84</li>
      <li>我是列表85</li>
      <li>我是列表86</li>
      <li>我是列表87</li>
      <li>我是列表88</li>
      <li>我是列表89</li>
      <li>我是列表90</li>
      <li>我是列表91</li>
      <li>我是列表92</li>
      <li>我是列表93</li>
      <li>我是列表94</li>
      <li>我是列表95</li>
      <li>我是列表96</li>
      <li>我是列表97</li>
      <li>我是列表98</li>
      <li>我是列表99</li>
      <li>我是列表100</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name:"Category",
  data() {
    return {
      scroll:''
    }
  },
  mounted() {
    this.scroll = new BScroll(".wrapper", {
      probeType:3,
      pullUpLoad:true
    })
    this.scroll.on('scroll', (position) => {
      console.log(position);
    })
    this.scroll.on('pullingUp', () => {
      console.log('上拉加载更多');
    })
  }
}
</script>

<style scoped>
  .wrapper {
    height: 200px;
    background-color: #ff5777;
    /* overflow: hidden; */
  }
</style>