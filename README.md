Bleix - Framework front-end
=====

O Bleix acelera o desenvolvimento do seu front-end por conter uma série de classes pré-definidas.
Ele tem como foco principal o desenvolvimento de sites responsivos, porém ele não utiliza de recursos de media query do css, e sim um plugin jquery que realiza o mesmo trabalho.
Ele contém um css padrão (bleix.css) e outros alternativos, como por exemplo o (bleix-mobile.css).

$.Bleix.ResponsiveLayout(min,max,state);
----

Essa função é responsável em definir qual o estado da página, vejamos o exemplo abaixo

	$.Bleix.ResponsiveLayout(0,980,'mobile');

O estado 'mobile' estará ativo quando a largura da página estiver entre 0px e 980px.

![Responsive](http://www.maniero.tk/bleix/responsive.png)

$.fn.BleixColumn(options)
----

Plugin responsável em criar colunas adaptáveis, vejamos o exemplo abaixo

	$('#columns').BleixColumn({ min_size : 400 });
	
Por padrão o min_size (tamanho mínimo que uma coluna pode ter) é 250.

Classes que as colunas podem ter:

* .bx-column-fixed (Colunas fixas, ou seja, acompanham a rolagem de scroll)
* .bx-keep-size, .bx-keep-horizontal-size (Colunas com tamanho fixo)

Quando as colunas não cabem mais na tela são atribuidas a elas a classe .bx-column-wrapped.

### Atenção:
Nunca customize as colunas com margem, padding e border.

Nomeclatura
----
Todas as classes do bleix devem começar com o pre-fixo "bx" 

### Criando css de estados

Todas as classes do css de estados devem começar com a classe do estado. Essa por padrão é .bx-"estado". No caso do exemplo acima será .bx-mobile.
As classes específicas dos estados também devem seguir a seguinte nomeclaturoa:

	.bx-"estado" .bx-"estado"-"classe"

Vejamos o exemplo do estado mobile a classe text-center.

	.bx-mobile .bx-mobile-text-center{ text-align: center }

### Sobrescrevendo classes

Você também pode sobrescrever classes, isso ocorre quando dois ou mais estados estão ativos ao mesmo tempo. Para sobrescrever basta utilizar a seguinte nomeclatura:

	.bx-"estado1" .bx-"estado2"-"classe"

Isso pode ser utilizado quando, por exemplo a .bx-margin do estado mobile for diferente da .bx-margin do estado padrão. Nesse caso o exemplo ficará da seguinte forma:

	.bx-mobile .bx-margin{ margin: 10px; }

Recursos externos
----
* [Normalize.css](http://necolas.github.com/normalize.css/)
* [EJS](http://embeddedjs.com/)
