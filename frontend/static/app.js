AFRAME.registerComponent('clickable', {
    init: function() {

        // Create lists of all the interactive shapes (clickable) and all interactive background elements (background)
        var clickable = this.clickable = this.el.querySelectorAll('.clickable');
        var background = this.background = this.el.querySelectorAll('#background');

        // Reference to the element containing the #shapeName and #shapeDescription
        var information = this.information = document.querySelector("#information")
        this.shapeName = document.querySelector('#shapeName');
        this.shapeDescription = document.querySelector('#shapeDescription');

        // The individual name and description data for each shape in the museum.
        this.museumData = {
            teapot: {
                name: 'Utah teapot (1975)',
                description: 'A standard reference model designed by Martin Newell.'
            },
            icosahedron: {
                name: 'Icosahedron',
                description: 'A twenty-sided shape composed entirely of equilateral triangles'
            },
            cone: {
                name: 'Cone',
                description: 'A shape with a circular base that tapers to a point.'
            },
            dodecahedron: {
                name: 'Dodecahedron',
                description: 'A polyhedron composed of twelve regular pentagons.'
            },
            torus: {
                name: 'Torus',
                description: 'A shape created from the revolution of a circle within 3D-space'
            },
            tetrahedron: {
                name: 'Tetrahedron',
                description: 'A four-sided shape composed of triangles.'
            },
            sphere: {
                name: 'Sphere',
                description: 'A shape in which all points are the same distance from a fixed center.'
            },
            suzanne: {
                name: 'Suzanne (2002)',
                description: 'The mascot for the free, open-source 3D computer graphics suite "Blender".  Suzanne is a primitive shape in that program.'
            },

        };

        // Binds each action to the context of this HTML component (clickable).
        this.onClick = this.onClick.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.reset = this.reset.bind(this);

        // Set events for clickable elements
        for (var i = 0; i < clickable.length; ++i) {
            clickable[i].addEventListener('mouseenter', this.onMouseEnter);
            clickable[i].addEventListener('mouseleave', this.onMouseLeave);
            clickable[i].addEventListener('click', this.onClick);
        }

        // Set events for background elements
        for (var i= 0; i < background.length; ++i) {
            background[i].addEventListener('click', this.reset);
        }
        
    },

    onClick: function (evt) {
        evt.target.setAttribute('material', 'color', '#80bbff'); // Visually differentiate selected shapes
        this.el.addState('clicked');  // A tag that we can check using .is()

        var museumData = this.museumData[evt.currentTarget.id]; // Gets museum data for the clicked object

        // Make information visible
        this.information.object3D.scale.set(1, 1, 1);
        this.information.object3D.visible = true;
        // Set information attributes
        this.shapeName.setAttribute('text', 'value', museumData.name);
        this.shapeDescription.setAttribute('text', 'value', museumData.description);
        
    },

    onMouseEnter: function (evt) {
        var clickable = this.clickable;
        evt.target.setAttribute('material', 'color', '#80bbff');
        // When mouse enters an object, maintain it's color while restoring all others to white (default)
        for (var i = 0; i < clickable.length; ++i) {
            if (evt.target === clickable[i]) { 
                continue; 
            } else {
                clickable[i].setAttribute('material', 'color', 'white');
            }
        }
    },

    onMouseLeave: function (evt) {
        // When mouse leaves an object, if it is clicked, stop and do nothing.  If it isn't, restore to default color.
        if (this.el.is('clicked')) {
            return;
        } else {
            evt.target.setAttribute('material', 'color', 'white');
        }
        
    },

    reset: function () {
        var clickable = this.clickable;
        for (var i = 0; i < clickable.length; ++i) {
            this.el.removeState('clicked'); // Remove "clicked" state
            clickable[i].emit('mouseleave'); // Clean up
        }
        // Make information invisible
        this.information.object3D.scale.set(0.001, 0.001, 0.001);
        this.information.object3D.visible = false;
    }
});