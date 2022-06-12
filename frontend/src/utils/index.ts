export default {
  formatAddress: (str: string) => {
    if (str?.length) {
      return `${str.substring(0, 6)}*****${str.substring(str?.length - 4)}`;
    }
    return '';
  },
};
