## DNS

用户请求发出先到DNS服务器，DNS服务器紧接着到根服务器去，要当前的顶级域名（比如：www.baidu.com）就是要.com这个域名，找到之后，就会把.com服务器的ip给DNS服务器，然后它再去查找.com中的.bindu，找到后将.baidu的ip给DNS服务器，然后再去.baidu找www的服务器，找到后将ip给DNS服务器，DNS服务器缓存住这个ip，缓存一份同时将ip给到用户浏览器。
查找的关键就是从后往前找，从最顶级域名往前边找（比方 ：先找国家，再找城市，再找区域，再找你家）
⚠️：判断几级域名，直接看有几个点，比如www.baidu.com就是有二级域名。比如：
一级域名：.com
二级域名：.baidu.com
⚠️：www.baidu.com和baidu.com比较，肯定是baidu.com能够表示的范围更大。相当于baidu.com只是找到城市而已。ww.baidu.com找到了具体的区域。而一个城市是有很多区域的，因此肯定是baidu.com这个域名
