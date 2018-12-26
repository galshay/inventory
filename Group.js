Array.prototype.gt=function(key)
{
var l=[];
var c=0;
var d=[];
for (i=0;i<this.length;i++)
{
 var k=this[i][key];
 if ( l[k] )
  {
   
   
    var cc=l[k].index;
    this[i].key=d[cc].count;
    d[cc].data.push(this[i])
    d[cc].count++;

  }
  else
  {
   var k=this[i][key];
   l[k]={};
    l[k].index=c;
    d[c]={};
    d[c].key=k;
    d[c].data=[];
    this[i].key=0;
    d[c].data.push(this[i])
    d[c].count=1;
    c+=1;
  }
  
}
return d;
}