import Card from '@/components/Card';
import GridLoader from '@/components/banners/GridLoader';

const SelectSupplierLoader = () => {
  return (
    <Card className="w-full">
      <GridLoader rows={1} className="w-1/3"/>
      <GridLoader rows={1} className="w-1/2"/>
      <GridLoader rows={1}/>
      <GridLoader rows={1} className="w-1/2"/>
      <GridLoader rows={1}/>
      <GridLoader rows={1}/>
    </Card>
  );
};

export default SelectSupplierLoader;